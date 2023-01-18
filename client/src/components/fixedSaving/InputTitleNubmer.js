import { Box, Input, styled } from '@mui/material';
import { rowCenter, theme } from '../../styles/theme';
import PropTypes from 'prop-types';

const StyledRow = styled(Box)`
  ${rowCenter}
  align-items: center;
`;

const StyledColorRow = styled(StyledRow)`
  background: #eef1ff;
  border-bottom: 4px solid #aac4ff;
  border-radius: 4px;
`;

const InputTitleNubmer = ({
  title = 'title',
  unit = 'unit',
  type = 'number',
  value = '',
}) => {
  return (
    <Box sx={{ margin: 3, width: '40%' }}>
      <h3>{title}</h3>
      <StyledColorRow sx={{ marginTop: 1 }}>
        <Input
          disableUnderline
          sx={{ input: { textAlign: 'end' } }}
          type={type}
          defaultValue={value}
          readOnly={type !== 'number'}
          inputRef={
            type === 'number' ? (input) => input && input.focus() : undefined
          }
        />
        <span style={{ padding: theme.spacing(2) }}>{unit}</span>
      </StyledColorRow>
    </Box>
  );
};

InputTitleNubmer.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default InputTitleNubmer;