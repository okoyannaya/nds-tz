import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useChangeNdsMutation,
  useDeleteNdsMutation,
} from "@containers/redux/api/nds.api";
import { ndsSelector } from "@containers/redux/selectors";
import { setLoading } from "@containers/redux/slice/nds.slice";
import { NdsItem } from "@containers/redux/types";

import { COLUMNS } from "./constants";
import { formatDateTime, toCustomISOStringWithDayjs } from "./helpers";

import "./table.styles.css";

export const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ndsList = useSelector(ndsSelector);
  const [detele] = useDeleteNdsMutation();
  const [change] = useChangeNdsMutation();

  const handleDelete = (id: string) => {
    dispatch(setLoading(true));
    detele(id)
      .then(() =>
        toast.success("The object has been removed from the database")
      )
      .catch(() => toast.error("Error during deletion"));
  };

  const handleRestore = (item: NdsItem) => {
    dispatch(setLoading(true));
    const restoreNds = { ...item, deletedAt: null };
    change(restoreNds)
      .then(() => toast.success("The object has been restored"))
      .catch(() => toast.error("Restore failed"));
  };

  const handleEdite = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleArchive = (item: NdsItem) => {
    dispatch(setLoading(true));

    const deletedAt = toCustomISOStringWithDayjs(new Date());

    const restoreNds = { ...item, deletedAt: deletedAt };
    change(restoreNds)
      .then(() => toast.warn("Object marked for deletion"))
      .catch(() => toast.error("Restore failed"));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {COLUMNS.map((item) => {
              return <th key={item.id}>{item.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {ndsList.map((item) => {
            const id = item.id;
            const isArchive = item.deletedAt ? "archive_row" : "";

            return (
              <tr key={id} className={isArchive}>
                {Object.entries(item).map(([key, value]) => {
                  if (key === "id") return null;
                  const isDate =
                    key === "createdAt" ||
                    key === "updatedAt" ||
                    key === "deletedAt";

                  return (
                    <td key={key}>{isDate ? formatDateTime(value) : value}</td>
                  );
                })}
                {item.deletedAt ? (
                  <td className="container_btns">
                    <button
                      onClick={() => handleDelete(id)}
                      className="delete btn"
                    >
                      delete
                    </button>
                    <button
                      onClick={() => handleRestore(item)}
                      className="restore btn"
                    >
                      restore
                    </button>
                  </td>
                ) : (
                  <td className="container_btns">
                    <button
                      onClick={() => handleEdite(id)}
                      className="edite btn"
                    >
                      edite
                    </button>
                    <button
                      onClick={() => handleArchive(item)}
                      className="archive btn"
                    >
                      archive
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
