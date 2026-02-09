/*
4th Question
PhonePe - State Management

Implement a multi-step form using React’s useReducer hook.
The form should contain multiple steps (e.g., Step 1, Step 2, Step 3),
where each step collects a subset of form fields.

Manage form state, navigation between steps, and validation logic using a
single reducer instead of multiple useState calls.

The reducer should handle:
Form data updates (field-level changes)
Step navigation (Next / Previous)
Validation per stepError state management
Final submission readiness
*/

import { useReducer } from "react";

const steps = [
  {
    name: { required: true, displayName: "Name", inputType: "text" },
    age: { required: true, displayName: "Age", inputType: "number" },
    description: {
      required: false,
      displayName: "Description",
      inputType: "text",
    },
  },
  {
    email: { required: true, displayName: "Email", inputType: "email" },
    phone: { required: false, displayName: "Phone", inputType: "tel" },
  },
  {
    skills: { required: true, displayName: "Skills", inputType: "text" },
    hobbies: { required: false, displayName: "Hobbies", inputType: "text" },
  },
];

const validateData = (data, currentStep) => {
  return Object.entries(steps[currentStep - 1])
    .filter(([, value]) => value.required)
    .every(([key, { inputType }]) => {
      if (inputType === "text") {
        return typeof data[key] === "string" && !!data[key]?.trim();
      } else if (inputType === "number") {
        const parsedNumber = Number(data[key]);
        return (
          !isNaN(parsedNumber) && (parsedNumber > 0) & (parsedNumber <= 100)
        );
      }
      return true;
    });
};

const initialFormState = {
  data: {},
  currentStep: 1,
  formSubmitted: false,
  validationStatus: validateData({}, 1),
};

function multiStepFormReducer(state, action) {
  switch (action.type) {
    case "updateState": {
      const { updatedState } = action;
      const updatedData = { ...state.data, ...updatedState };
      const validationStatus = validateData(updatedData, state.currentStep);
      return {
        ...state,
        data: updatedData,
        validationStatus,
      };
    }
    case "nextStep": {
      if (state.currentStep > steps.length) {
        throw new Error("Can't procced to next step, already on last step");
      }
      if (state.currentStep === steps.length) {
        return { ...state, formSubmitted: true };
      }
      return { ...state, currentStep: state.currentStep + 1 };
    }
    case "previousStep": {
      if (state.currentStep === 1) {
        throw new Error("Can't procced to next step, already on last step");
      }
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
  }
}

function Step({
  stepState,
  handlFieldChange,
  handleNextStep,
  handlePreviousStep,
}) {
  const { data, formSubmitted, currentStep, validationStatus } = stepState;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {Object.entries(steps[currentStep - 1]).map(
          ([fieldName, { required, displayName, inputType }]) => (
            <div
              key={fieldName}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label
                htmlFor={fieldName}
              >{`${displayName}${required ? "*" : ""}`}</label>
              <input
                id={fieldName}
                name={fieldName}
                onChange={handlFieldChange}
                required={required}
                value={data[fieldName] ?? ""}
                disabled={formSubmitted}
                type={inputType}
              />
            </div>
          ),
        )}
      </div>
      <button
        disabled={currentStep === 1 || formSubmitted}
        onClick={handlePreviousStep}
      >
        Previous
      </button>
      <button
        disabled={formSubmitted || !validationStatus}
        onClick={handleNextStep}
      >
        {currentStep === steps.length ? "Submit" : "Next"}
      </button>
      {formSubmitted && alert(JSON.stringify(stepState))}
    </div>
  );
}

export default function MultiStepForm() {
  const [currentState, dispatch] = useReducer(multiStepFormReducer, {
    ...initialFormState,
  });

  const handlFieldChange = (e) => {
    dispatch({
      type: "updateState",
      updatedState: { [e.target.name]: e.target.value },
    });
  };
  const handleNextStep = () => {
    dispatch({
      type: "nextStep",
    });
  };
  const handlePreviousStep = () => {
    dispatch({
      type: "previousStep",
    });
  };

  return (
    <div
      style={{
        width: "min-content",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Step
        stepState={currentState}
        handlFieldChange={handlFieldChange}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
      />
    </div>
  );
}

/*
1st Attempt - Referred usaeReducer react official docs as haven't used it in a while

Time taken - 1hr 30min
 */
