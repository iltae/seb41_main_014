import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import {
  FS_BANKS,
  FS_D_DCLS_CHRG_MAN,
  FS_D_FIN_PRDT_NM,
  FS_D_INTER_RATE_TYPE_NM,
  FS_D_INTR_RATE,
  FS_D_INTR_RATE2,
  FS_D_JOIN_DENY,
  FS_D_KOR_CO_NM,
  FS_D_RSRV_TYPE_NM,
  getWRAPPER_DATA,
} from '../helper/fixedSavingHelper';
import InputTitleNubmer from '../components/fixedSaving/InputTitleNubmer';
import SelectGroup from '../components/fixedSaving/SelectGroup';
import BankCheck from '../components/fixedSaving/BankCheck';
import { columnCenter } from '../styles/theme';
import { DUMMY_FiexedSavings } from '../data/dummies';
import { getPERCENT_WITH_TEXT } from '../helper/unitHelper';
// import PropTypes from 'prop-types';
// import { theme } from '../styles/theme';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import SortIcon from '@mui/icons-material/Sort';

const Notice = () => {
  const contents = [
    '본 사이트에서는 최신정보 제공을 위해 노력하고 있으나, 금융회사의 상품별 이자율 등 거래조건이 수시로 변경되어 지연공시될 수 있으므로 거래전 반드시 해당 금융회사에 문의하시기 바랍니다.',
    '세전 이자율은 우대조건을 반영하지 않은 기본금리입니다. 상세정보의 우대조건에 해당시 보다 높은 이자율이 적용될 수 있습니다.',
    '세후 이자율은 이자소득 원천징수세 15.4%(소득세 14%, 지방소득세 1.4%)를 차감한 금리입니다.',
    '세후이자 및 세후 실수령액은 원단위 절사, 복리의 경우 월복리 가정 등을 적용하여 비교 편의를 위해 예시한 계산금액으로 실제 실수령액과 차이가 발생할 수 있으므로 검색결과 ‘상세정보’를 반드시 확인하시고, 상품 가입시 해당 금융회사에 정확한 금액을 직접 문의하시기 바랍니다. (자유적립식 적금상품은 적금액이 일정하지 않으므로 산출하지 않습니다.)',
    '상세정보에서 확인할 수 있는 ‘우대조건’은 금융회사가 가입조건에 따른 우대이율을 부여할 경우 작성하도록 하고 있습니다.',
  ];
  return (
    <>
      <h2 style={{ color: 'white' }}>주의</h2>
      <List>
        {contents.map((content, index) => (
          <ListItem key={index} sx={{ p: 1, color: 'white' }}>
            <Typography
              sx={(theme) => ({
                fontSize: theme.fontSizes.lg,
              })}
            >
              {content}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const FixedSavingContent = () => {
  //const [loading, setLoading] = useState(false);
  //const mounted = useRef(true);
  /* const handleOnRowsScrollEnd = (params) => {
    if (loadedRows.length <= MAX_ROW_LENGTH) {
      loadServerRows(params.viewportPageSize);
    }
  }; */
  /* useEffect(() => {
    return () => {
      mounted.current = true;
    };
  }, []); */
  const columns = [
    FS_D_KOR_CO_NM,
    FS_D_FIN_PRDT_NM,
    FS_D_RSRV_TYPE_NM,
    FS_D_INTR_RATE,
    FS_D_INTR_RATE2,
    FS_D_JOIN_DENY,
    FS_D_INTER_RATE_TYPE_NM,
    FS_D_DCLS_CHRG_MAN,
    { field: 'detail', headerName: '상세보기' },
  ];
  const rows = getWRAPPER_DATA(DUMMY_FiexedSavings);
  console.log(rows);
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        mt: 2,
        mb: 2,
        height: 'auto',
        border: `4px solid ${theme.colors.mainMiddle}`,
        backgroundColor: theme.colors.mainMiddle,
        borderRadius: 2,
      })}
    >
      <Grid container>
        {/* 헤더행 */}
        {columns.map((column) => (
          <Grid
            key={column.field}
            sx={() => ({
              display: 'flex',
              alignItems: 'center',
            })}
            item
            xs={
              column.field === FS_D_KOR_CO_NM.field ||
              column.field === FS_D_FIN_PRDT_NM.field ||
              column.field === FS_D_DCLS_CHRG_MAN.field
                ? 2
                : 1
            }
          >
            <Typography
              sx={(theme) => ({
                p: 2,
                fontSize: theme.fontSizes.lg,
                fontWeight: theme.fontWeight.bold,
              })}
            >
              {column.headerName}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {rows.map((row) => (
        <Grid
          container
          key={row.id}
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            border: `1px solid ${theme.colors.mainMiddle}`,
            backgroundColor: theme.colors.mainLight,
          })}
        >
          <Grid item xs={1.5}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {row.korCoNm}
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {row.finPrdtNm}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {row.rsrvTypeNm}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {getPERCENT_WITH_TEXT(row.intrRate)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {getPERCENT_WITH_TEXT(row.intrRate2)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {row.joinDeny}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {row.intrRateTypeNm}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={(theme) => ({
                p: 1,
                fontSize: theme.fontSizes.base,
                whiteSpace: 'pre-wrap',
              })}
            >
              {row.dcls_chrg_man}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              sx={(theme) => ({ p: 1, fontSize: theme.fontSizes.base })}
            >
              {}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

/* 
      {/* <DataGrid
        sx={(theme) => ({
          boxShadow: 2,
          border: 4,
          borderColor: theme.colors.mainMiddle,
          borderRadius: 2,
        })}
        rows={rows}
        columns={columns}
        autoHeight
        checkboxSelection
        headerHeight={30}
        rowHeight={30}
      /> 
*/

const UserSelected = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <p>검색조건</p>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <p>저축금액</p>
          <p>저축 예정기간</p>
          <p>적립방식</p>
          <p>이자계산방식</p>
          <p>가입대상</p>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p>100원</p>
          <p>12개월</p>
          <p>정액적립식</p>
          <p>단리</p>
          <p>제한없음,서민전용,일부제한</p>
        </Box>
      </Box>
    </Box>
  );
};

const ChoiceButtonGroup = () => {
  return (
    <ButtonGroup>
      <Button>뒤로가기</Button>
      <Button>초기화</Button>
      <Button>검색</Button>
    </ButtonGroup>
  );
};

const FixedSaving = () => {
  const title = '나에게 맞는 적금 추천 받는 방법';
  const contents = [
    '나에게 딱 맞는 상품을 높은 이율 순으로 알려줘요!',
    '관심 적금 상품 발견 시 클릭하면 상세 정보를 알 수 있어요!',
  ];
  return (
    <>
      <Divider light />
      <Box
        sx={() => ({
          ...columnCenter,
        })}
      >
        <Box
          sx={(theme) => ({
            p: 5,
            mt: 2,
            mb: 2,
            backgroundColor: theme.colors.mainLight,
          })}
        >
          <h2>{title}</h2>
          {contents.map((content, index) => (
            <p key={index} style={{ pt: 2 }}>
              {content}
            </p>
          ))}
        </Box>
      </Box>
      <Divider />
      <InputTitleNubmer title="월 저축금액" unit="원" />
      <Divider />
      <SelectGroup
        title={'저축 희망 기간'}
        buttons={[
          { title: '6개월', value: 6 },
          { title: '12개월', value: 12 },
          { title: '24개월', value: 24 },
          { title: '36개월', value: 36 },
        ]}
      />
      <Divider />
      <InputTitleNubmer title="총 저축금액" unit="원" type="text" />
      <Divider />
      <SelectGroup
        title="적립방식"
        buttons={[
          { title: '전체', value: 255 },
          { title: '정액적립식', value: 256 },
          { title: '자유적립식', value: 257 },
        ]}
      />
      <Divider />
      <BankCheck title="주 거래은행" buttons={FS_BANKS} />
      <Divider />
      <SelectGroup
        title={'이자계산방식'}
        buttons={[
          { title: '전체', value: 355 },
          { title: '단리', value: 356 },
          { title: '복리', value: 357 },
        ]}
      />
      <Divider />
      <Box
        sx={(theme) => ({
          mt: theme.spacing(2),
          mb: theme.spacing(2),
          p: theme.spacing(4),
          backgroundColor: theme.colors.accent,
          borderRadius: 2,
        })}
      >
        <Notice />
      </Box>
      <Divider />
      <FixedSavingContent />
      <UserSelected />
      <ChoiceButtonGroup />
    </>
  );
};

export default FixedSaving;