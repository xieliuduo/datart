/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { message } from 'antd';
import { Brand } from 'app/components/Brand';
import useI18NPrefix from 'app/hooks/useI18NPrefix';
import { selectSystemInfo } from 'app/slice/selectors';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { RegisterForm } from './RegisterForm';
import { SendEmailTips } from './SendEmailTips';
import { sendEmail } from './service';
import { WithoutActivation } from './WithoutActivation';

export function RegisterPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [sendEmailLoading, setSendEmailLoading] = useState(false);
  const systemInfo = useSelector(selectSystemInfo);
  const mailEnable = systemInfo?.mailEnable ?? true;
  const t = useI18NPrefix('register');

  const onRegisterSuccess = useCallback((email: string) => {
    setEmail(email);
    setIsRegister(false);
  }, []);

  const goBack = useCallback(() => {
    setIsRegister(true);
  }, []);

  const onSendEmail = useCallback(() => {
    setSendEmailLoading(true);
    sendEmail(email)
      .then(() => {
        setSendEmailLoading(false);
        message.success(t('sendSuccess'));
      })
      .catch(() => {
        setSendEmailLoading(false);
      });
  }, [email, t]);

  return (
    <Wrapper>
      <Brand />
      {isRegister ? (
        <RegisterForm onRegisterSuccess={onRegisterSuccess} />
      ) : mailEnable ? (
        <SendEmailTips
          email={email}
          loading={sendEmailLoading}
          onBack={goBack}
          onSendEmailAgain={onSendEmail}
        />
      ) : (
        <WithoutActivation onContinue={goBack} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
