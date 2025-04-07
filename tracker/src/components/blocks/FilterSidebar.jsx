import React from "react";
import Text from "./Text";
import { NativeSelect, Stack } from "@chakra-ui/react";

/**
 * FilterSidebar component that provides filtering options for models and states.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.models - Array of model objects with `id` and `name` properties.
 * @param {Array<Object>} props.states - Array of state objects with `id` and `name` properties.
 * @param {function} props.onStateChange - Callback function invoked when the state filter is changed.
 * @param {function} props.onModelChange - Callback function invoked when the model filter is changed.
 * @returns {JSX.Element}
 */
function FilterSidebar(props) {
  const [state, setState] = React.useState("");
  const [model, setModel] = React.useState("");

  function handleStateChange(e) {
    setState(e.target.value);
    props.onStateChange(e.target.value);
  }

  function handleModelChange(e) {
    setModel(e.target.value);
    props.onModelChange(e.target.value);
  }

  return (
    <Stack px="8" py="8">
      <Text variant="title">Tracker</Text>
      <Text textStyle="2xl">Filtros</Text>
      <NativeSelect.Root size="md">
        <NativeSelect.Field
          value={model}
          placeholder="Modelos"
          onChange={handleModelChange}
        >
          {props.models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <NativeSelect.Root size="md">
        <NativeSelect.Field
          value={state}
          placeholder="Estado"
          onChange={handleStateChange}
        >
          {props.states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Stack>
  );
}

export default FilterSidebar;
