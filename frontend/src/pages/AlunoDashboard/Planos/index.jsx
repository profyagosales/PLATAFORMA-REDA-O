import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  Check as CheckIcon,
  Payment as PaymentIcon,
  Description as EssayIcon,
  Speed as SpeedIcon,
  School as TeacherIcon
} from '@mui/icons-material';

function Planos() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar planos');
      }

      const data = await response.json();
      setPlans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCheckoutDialogOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutDialogOpen(false);
    setSelectedPlan(null);
    setPaymentMethod('credit_card');
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          planId: selectedPlan._id,
          paymentMethod
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      handleCheckoutClose();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Planos Disponíveis
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan._id}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h4" component="div">
                    R$ {plan.price.toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {plan.billingPeriod === 'monthly' ? '/mês' : '/ano'}
                  </Typography>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EssayIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${plan.essaysPerMonth} redações por mês`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SpeedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`Correção em até ${plan.correctionTime}h`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TeacherIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Professores especializados"
                    />
                  </ListItem>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  onClick={() => handlePlanSelect(plan)}
                  startIcon={<PaymentIcon />}
                >
                  Assinar Plano
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={checkoutDialogOpen} onClose={handleCheckoutClose}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedPlan?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              R$ {selectedPlan?.price.toFixed(2)} / {selectedPlan?.billingPeriod === 'monthly' ? 'mês' : 'ano'}
            </Typography>
          </Box>

          <FormControl component="fieldset">
            <FormLabel component="legend">Forma de Pagamento</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel 
                value="credit_card" 
                control={<Radio />} 
                label="Cartão de Crédito" 
              />
              <FormControlLabel 
                value="pix" 
                control={<Radio />} 
                label="PIX" 
              />
              <FormControlLabel 
                value="boleto" 
                control={<Radio />} 
                label="Boleto Bancário" 
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckoutClose}>Cancelar</Button>
          <Button 
            onClick={handleCheckout}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar Pagamento'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Planos;

export default Planos;
