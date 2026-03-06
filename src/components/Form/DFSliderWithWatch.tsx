import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import ReactSlider from "react-slider";

type TSliderProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: any;
};

export default function DFSliderWithWatch({ name, setValue }: TSliderProps) {
  const { control } = useFormContext();

  const dispatch = useAppDispatch();

  const method = useFormContext();
  const value = useWatch({
    control: method.control,
    name,
  });

  useEffect(() => {
    if (setValue) {
      dispatch(setValue(value));
    }
  }, [value, setValue, dispatch]);

  return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            thumbActiveClassName="active-thumb"
            min={1}
            max={50}
            minDistance={10}
            {...field}
            onChange={field.onChange}
          />
        )}
      />
  );
}
