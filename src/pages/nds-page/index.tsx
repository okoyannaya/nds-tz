import { useEffect } from "react";
import { Table } from "@components/table";
import { useGetAllNdsQuery } from "@containers/redux/api/nds.api";
import { useAppDispatch } from "@containers/redux/hooks";
import { setLoading, setNdsList } from "@containers/redux/slice/nds.slice";

export const NdsTablePage = () => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading } = useGetAllNdsQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (data?.length && isSuccess) {
      dispatch(setNdsList(data));
    }
  }, [data, isSuccess, isLoading]);

  return <Table />;
};
