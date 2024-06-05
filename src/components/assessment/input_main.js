import InputOpen from "./inputs/open";
import InputOptionCol from "./inputs/option_column";
import InputOptionRow from "./inputs/option_row";

export default function MainInput({ item }) {
  const { input_type } = item;

  if (input_type == "InputOptionRow") return <InputOptionRow item={item} />;
  if (input_type == "InputOptionCol") return <InputOptionCol item={item} />;
  if (input_type == "InputOpen") return <InputOpen item={item} />;
}
