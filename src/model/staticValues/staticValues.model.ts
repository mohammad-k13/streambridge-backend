import mongoose, { model } from "mongoose";
import { IStaticValues } from "./staticValues.type";
import { AllowedValues, allowedValues } from "../../constants/staticValues";

const staticValuesSchema = new mongoose.Schema<IStaticValues>({
  key: {
    type: String,
    enum: Object.keys(allowedValues),
    required: true,
  },
  value: {
    type: String,
    enum: [],
    required: true,
    validate: {
      validator: function (value: string) {
        return allowedValues[this.key as keyof AllowedValues].includes(value);
      },
    },
  },
});

const StaticValues = model("StaticValues", staticValuesSchema);
export default StaticValues;
