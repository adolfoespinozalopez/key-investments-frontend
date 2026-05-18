import React, { useEffect, useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  CircularProgress, 
  Fade 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
};

// Pasos del pipeline de límites financieros
const PIPELINE_STEPS = [
  { label: 'Verificando Horario de Mercado', duration: 1500 },
  { label: 'Validando Límite de Exposición por Fondo', duration: 1500 },
  { label: 'Validando Límite de Contraparte (Agente Bolsa)', duration: 1000 },
  { label: 'Comprobando Restricciones de Custodia e ISIN', duration: 2100 },
  { label: 'Registrando Operación en Mesa de Dinero', duration: 1500 }
];

interface PipelineModalProps {
  open: boolean;
  onComplete: () => void;
}

export const PipelineValidationModal: React.FC<PipelineModalProps> = ({ open, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      return;
    }

    let currentStep = 0;

    const runPipeline = async () => {
      for (const step of PIPELINE_STEPS) {
        await new Promise((resolve) => setTimeout(resolve, step.duration));
        currentStep++;
        setActiveStep(currentStep);
      }
      // Pequeña pausa al terminar para que el usuario note que todo está en verde
      await new Promise((resolve) => setTimeout(resolve, 600));
      onComplete();
    };

    runPipeline();
  }, [open, onComplete]);

  // Renderizador de iconos personalizados para simular el Pipeline
  const renderStepIcon = (stepIndex: number) => {
    if (activeStep > stepIndex) {
      return <CheckCircleIcon color="success" fontSize="small" />;
    }
    if (activeStep === stepIndex) {
      return <CircularProgress size={18} thickness={5} color="primary" />;
    }
    return <PendingActionsIcon color="disabled" fontSize="small" />;
  };

  return (
    <Modal open={open} closeAfterTransition aria-labelledby="pipeline-validation-title">
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography id="pipeline-validation-title" variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Pipeline de Validación
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Evaluando reglas de límites y afectaciones en tiempo real
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} orientation="vertical" sx={{ pl: 2 }}>
            {PIPELINE_STEPS.map((step, index) => {
              const isProcessing = activeStep === index;
              const isCompleted = activeStep > index;

              return (
                <Step key={step.label}>
                  <StepLabel 
                    StepIconComponent={() => renderStepIcon(index)}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: '0.875rem',
                        fontWeight: isProcessing ? 'bold' : 'normal',
                        color: isProcessing ? 'primary.main' : isCompleted ? 'success.main' : 'text.secondary'
                      }
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Fade>
    </Modal>
  );
};