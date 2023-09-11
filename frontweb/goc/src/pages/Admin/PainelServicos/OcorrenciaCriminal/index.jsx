import { useState } from "react";
import EtapaDadosGeraisForm from "./EtapaDadosGerais";
import EtapaDadosVitimaForm from "./EtapaDadosVitima";
import EtapaCrimesEnvolvidosForm from "./EtapaCrimesEnvolvidos";

const OcorrenciaCriminalForm = () => {
  const [visibleEtapaDadosGerais, setVisibleEtapaDadosGerais] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const changeStep = (step) => {
    const newCurrentStep = currentStep + step;
    setCurrentStep(newCurrentStep);
  };

  return (
    <div
      className="card"
      style={{
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
        margin: "5px 25px",
      }}
    >
      <div className="card-body">
        <h2 className="card-title text-center">
          {/* Formulário Ocorrência Policial */}
          Formulário
        </h2>
        {currentStep == 0 && <EtapaDadosGeraisForm changeStep={changeStep} />}
        {currentStep == 1 && <EtapaDadosVitimaForm changeStep={changeStep} />}
        {currentStep == 2 && (
          <EtapaCrimesEnvolvidosForm changeStep={changeStep} />
        )}
      </div>
    </div>
  );
};

export default OcorrenciaCriminalForm;
