import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from '@mui/material';
import { getFS_DATA } from '../../helper/fixedSavingHelper';
import { useState } from 'react';
import { getLOCALE_MONEY, getPERCENT_WITH_TEXT } from '../../helper/unitHelper';
import GridColumn from './GridColumn';
import GridRow from './GridRow';
import FiexedSavingContentDetailItem from './FixedSavingContentDetailItem';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import {
  setFixedSavings,
  setFixedSavingsPageInfo,
} from '../../reducer/fixedSavingsSlice';

const FixedSavingContents = () => {
  const conditions = useSelector((state) => state.savingConditions.origin);
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const nextHandle = () => {
    const getBanksCode = () => {
      const finCodes = [];
      for (let index = 0; index < conditions.banks.isCheckeds.length; index++) {
        const el = conditions.banks.isCheckeds[index];
        if (el) {
          finCodes.push(index);
        }
      }
      //전체일때
      if (
        finCodes.length === conditions.banks.isCheckeds.length ||
        finCodes.length === 0
      )
        return [];
      //선택된것만 추출
      for (let index = 0; index < finCodes.length; index++) {
        finCodes[index] = conditions.banks.fixed.data[index].finCoNo;
      }
      return finCodes;
    };

    setTimeout(() => {
      axios
        .post(
          'http://ec2-43-201-0-232.ap-northeast-2.compute.amazonaws.com:8080/api/savings',
          {
            monthlySavings: conditions.monthlySavings.value,
            saveTrm: conditions.saveTrm.value,
            rsrvType:
              conditions.rsrvType.value === -1
                ? undefined
                : conditions.rsrvType.value,
            finCoNoList: getBanksCode(),
            intrRateType:
              conditions.intrRateType.value === -1
                ? undefined
                : conditions.intrRateType.value,
            joinDeny:
              conditions.joinDeny.value === -1
                ? undefined
                : conditions.joinDeny.value,
          },
          {
            headers: { withCredentials: true },
            params: {
              page: fixedSavings.pageInfo.origin.page + 1,
              size: fixedSavings.pageInfo.origin.size,
            },
          }
        )
        .then((response) => {
          const { data } = response;
          if (data.data.length === 0) {
            alert('succeed: No data');
            return;
          }

          const hasMore = data.pageInfo.page < data.pageInfo.totalPages;
          dispatch(
            setFixedSavingsPageInfo({ origin: data.pageInfo, hasMore: hasMore })
          );

          const newData = fixedSavings.origin.concat(data.data);
          dispatch(setFixedSavings(newData));
          //페이지 정보
        })
        .catch((error) => {
          alert(error);
        });
    }, 1500);
  };
  const column = getFS_DATA();
  const fixedSavings = useSelector((state) => state.fixedSavings);
  return (
    <Box
      sx={(theme) => ({
        width: '98.5%',
        height: 'auto',
        mt: 2,
        mb: 2,
        border: `4px solid ${theme.colors.mainMiddle}`,
        borderRadius: 2,
        backgroundColor: theme.colors.mainMiddle,
      })}
    >
      <Grid container>
        <GridColumn data={column.korCoNm.headerName} xs={3} column={column} />
        <GridColumn
          data={column.finPrdtNm.headerName}
          xs={3.5}
          column={column}
        />
        <GridColumn
          data={column.joinDeny.headerName}
          xs={1.5}
          column={column}
        />
        <GridColumn data={column.intrRate.headerName} xs={1} column={column} />
        <GridColumn
          data={column.intrRateTypeNm.headerName}
          xs={1}
          column={column}
        />
        <GridColumn
          data={column.interestAmount.headerName}
          xs={2}
          column={column}
        />
      </Grid>
      <InfiniteScroll
        dataLength={fixedSavings.origin.length}
        next={nextHandle}
        hasMore={fixedSavings.pageInfo.hasMore}
        loader={
          <Box sx={{ p: 2 }}>
            <h2>검색 중...</h2>
          </Box>
        }
        endMessage={
          <Box sx={{ p: 2 }}>
            <h2>총 {fixedSavings.origin.length}개 적금이 검색되었습니다.</h2>
          </Box>
        }
      >
        {fixedSavings.origin.map((fixedSaving) => (
          <Accordion
            key={fixedSaving.interestId}
            sx={(theme) => ({
              backgroundColor: theme.colors.mainLight,
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
              '&:active': {
                opacity: 0.6,
              },
            })}
            expanded={expanded === fixedSaving.interestId}
            onChange={handleChange(fixedSaving.interestId)}
          >
            <AccordionSummary sx={{ p: 0 }}>
              <Grid
                container
                sx={() => ({
                  display: 'flex',
                  justifyContent: 'center',
                })}
              >
                <GridRow data={fixedSaving.korCoNm} xs={3} />
                <GridRow data={fixedSaving.finPrdtNm} xs={3.5} />
                <GridRow data={fixedSaving.joinDeny} xs={1.5} align="center" />
                <GridRow
                  data={getPERCENT_WITH_TEXT(fixedSaving.intrRate)}
                  xs={1}
                  align="end"
                />
                <GridRow
                  data={fixedSaving.intrRateTypeNm}
                  xs={1}
                  align="center"
                />
                <GridRow
                  data={getLOCALE_MONEY(fixedSaving.interestAmount)}
                  xs={2}
                  align="end"
                />
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              sx={(theme) => ({
                backgroundColor: theme.colors.white,
                borderRadius: 1,
                p: 2,
              })}
            >
              {Object.entries(fixedSaving)
                .filter(
                  (el) =>
                    el[0] === column.rsrvTypeNm.field ||
                    el[0] === column.joinWay.field ||
                    el[0] === column.spclCnd.field ||
                    el[0] === column.mtrtInt.field ||
                    el[0] === column.joinMember.field ||
                    el[0] === column.etcNote.field ||
                    el[0] === column.maxLimit.field ||
                    el[0] === column.intrRate2.field
                )
                .map((el) => (
                  <FiexedSavingContentDetailItem
                    key={el[0]}
                    title={column[el[0]].headerName}
                    content={
                      el[0] === column.maxLimit.field
                        ? getLOCALE_MONEY(el[1])
                        : el[0] === column.intrRate2.field
                        ? getPERCENT_WITH_TEXT(el[1])
                        : el[1]
                    }
                  />
                ))}
              <FiexedSavingContentDetailItem
                title={column.dcls_chrg_man.headerName}
                content={fixedSaving.dcls_chrg_man}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default FixedSavingContents;