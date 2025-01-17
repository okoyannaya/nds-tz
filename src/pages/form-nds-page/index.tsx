import { useParams } from "react-router-dom";
import { FormNds } from "@components/form";

export const FormNdsPage = () => {
  const { id } = useParams<{id: string}>();

  return <FormNds title={id ? "Edite Nds" : "Create Nds"} isCreate={!id} />;
};
