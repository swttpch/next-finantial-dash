import { StatsProps } from '@/types/common.types';
import {
  Card,
  CardBody,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

function StatsCard({ label, number, statHelper }: StatsProps) {
  return (
    <>
      <Card data-type="Card" overflow="hidden" variant="outline" flex={1}>
        <CardBody data-type="CardBody">
          <Stat data-type="Stat">
            <StatLabel data-type="StatLabel">{label}</StatLabel>
            <StatNumber data-type="StatNumber">{number}</StatNumber>
            {statHelper && (
              <StatHelpText data-type="StatHelpText">
                <StatArrow data-type="StatArrow" type={statHelper.type}></StatArrow>
                {statHelper.value}
              </StatHelpText>
            )}
          </Stat>
        </CardBody>
      </Card>
    </>
  );
}

export default StatsCard;
