import mongoose, { model } from "mongoose";
import { IStaticValues } from "./staticValues.type";
import { AllowedValues, allowedValues } from "../../constants/types";

const staticValuesSchema = new mongoose.Schema<IStaticValues>({
    key: {
        type: String,
        enum: Object.keys(allowedValues),
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const StaticValues = model("StaticValues", staticValuesSchema);
export default StaticValues;
