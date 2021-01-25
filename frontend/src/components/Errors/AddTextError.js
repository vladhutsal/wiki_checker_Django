import Typography from '@material-ui/core/Typography';

export default function TextError(props) {
  return (
    <Typography
      variant="overline"
      style={{ color: '#F0856E' }}
    >
      {props.serverMsg}
    </Typography>
  );
}