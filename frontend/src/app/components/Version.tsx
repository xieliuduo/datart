import useI18NPrefix from 'app/hooks/useI18NPrefix';
import styled from 'styled-components';
import { SPACE_LG } from 'styles/StyleConstants';

interface VersionProps {
  version?: string;
}

export function Version({ version }: VersionProps) {
  const t = useI18NPrefix('global');
  return version ? (
    <S.Content>
      {t('version')}: {version}
    </S.Content>
  ) : null;
}

const S: any = {};

S.Content = styled.h3`
  position: absolute;
  right: ${SPACE_LG};
  bottom: ${SPACE_LG};
  color: ${p => p.theme.textColorDisabled};
`;
