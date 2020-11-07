import React, { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  notification,
  Spin,
  Typography,
} from 'antd';
import logo from '../../scholarx.png';
import styles from './styles.css';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { Mentee } from '../../../../interfaces';

const { Title } = Typography;

function MenteeApplication() {
  const [form] = Form.useForm();
  const { mentorId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apply = (values: any) => {
    setIsLoading(true);
    const submissionURL: string = values.url;
    axios
      .put(
        `http://localhost:8080/api/scholarx/mentors/${mentorId}/mentee/application`,
        submissionURL
      )
      .then((result: AxiosResponse<Mentee>) => {
        if (result.status == 200) {
          setIsLoading(false);
          notification.success({
            message: 'Success!',
            description: 'Successfully applied!',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when applying for the mentor',
        });
      });
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col md={2} />
        <Col md={12}>
          <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
          <Title level={2}>Apply as a Mentee</Title>
        </Col>
      </Row>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className={styles.form}>
          <Form layout="vertical" size="large" onFinish={apply} form={form}>
            <Row>
              <Col md={2} />
              <Col md={8}>
                <Title level={4}>CV URL (Google Drive)</Title>
                <Form.Item
                  name="url"
                  rules={[
                    { required: true, message: 'Please add your CV URL!' },
                  ]}
                >
                  <Input placeholder="Add CV URL here" />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={2} />
              <Col md={12}>
                <Button htmlType="button">Cancel</Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className={styles.submitButton}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Spin>
    </div>
  );
}

export default MenteeApplication;
