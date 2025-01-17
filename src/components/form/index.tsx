import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNdsMutation,
  useChangeNdsMutation,
} from "@containers/redux/api/nds.api";
import { useAppDispatch } from "@containers/redux/hooks";
import { ndsSelector } from "@containers/redux/selectors";
import { setLoading } from "@containers/redux/slice/nds.slice";

import { FormNdsProps, InitialData } from "./form.types";
import { generateUUID, getValue, INITIAL_STATE } from "./helpers";

import "./form.styles.css";

export const FormNds: FC<FormNdsProps> = ({ title, isCreate }) => {
  const { id } = useParams<{id: string}>();
  const [addNds] = useAddNdsMutation();
  const [changeNds] = useChangeNdsMutation();

  const dispatch = useAppDispatch();
  const allNds = useSelector(ndsSelector);
  const currenNds = allNds.find((item) => item.id === id);

  const [formData, setFormData] = useState<InitialData>(INITIAL_STATE);

  const isDisabled =
    Object.values(formData).filter((val) => Boolean(String(val))).length !==
    Object.keys(formData).length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: getValue(name, value, prev.value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreate) {
      dispatch(setLoading(true));
      const newNds = {
        ...formData,
        id: generateUUID(),
        deletedAt: null,
        value: Number(formData.value),
      };
      
      addNds(newNds)
        .then(() => {
          toast.success("New object added successfully");
        })
        .catch(() => {
          toast.error("Error when adding object");
        })
        .finally(() => {
          dispatch(setLoading(false));
          setFormData(INITIAL_STATE);
        });
    } else {
      dispatch(setLoading(true));
      const newNds = {
        ...currenNds,
        ...formData,
        value: Number(formData.value),
      };

      changeNds(newNds)
        .then(() => {
          toast.success("The object was successfully modified");
        })
        .catch(() => {
          toast.error("Error when modified object");
        })
        .finally(() => {
          dispatch(setLoading(false));
          setFormData(INITIAL_STATE);
        });
    }
  };

  useEffect(() => {
    setFormData(INITIAL_STATE);
  }, [isCreate]);

  useEffect(() => {
    if (id) {
      if (currenNds) {
        setFormData({
          name: currenNds.name,
          description: currenNds.description,
          value: currenNds.value,
        });
      }
    }
  }, []);

  const messageInform = isDisabled ? "*All fields are required" : "";

  return (
    <div className="form_wrapper">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="container_field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="container_field">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="container_field">
          <label>Value:</label>
          <input name="value" value={formData.value} onChange={handleChange} />
        </div>
        <div className="inform_msg">{messageInform} </div>

        <button disabled={isDisabled} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
