import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

const steps = [
  {
    title: 'Check in',
    summary: 'Summary',
    image: require('../StepQR.png')
  },
  {
    title: 'Order and enjoy',
    summary: 'Summary',
    image: require('../StepOrder.png')
  },
  {
    title: 'Leave when you want',
    summary: 'Summary',
    image: require('../StepLeave.jpg')
  },
]

function ProductHowItWorks(props) {
  const { classes, onClick } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <div>
          <Grid container spacing={5}>
            {steps.map((step, idx) => 
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <div className={classes.number}>{idx + 1}.</div>
                  <img
                    src={step.image}
                    alt="suitcase"
                    className={classes.image}
                  />
                  <Typography variant="h5" align="center">
                    {step.title}
                  </Typography>
                </div>
              </Grid>
              )}
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          onClick={onClick}
        >
          Get started
        </Button>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
