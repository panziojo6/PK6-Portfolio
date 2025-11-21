import { Typography, Row, Col, Form, Input, Button, message, Space } from "antd";
import { MailOutlined, LinkedinOutlined, GithubOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import "../css/App.css";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Contact form:", values);
    message.success("Thank you! I will get back to you soon.");
    form.resetFields();
  };

  return (
    <div className="section-inner contact-section">
      <Row gutter={40} align="middle">
        {/* LEFT SIDE – Info / CTA */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="section-title">
              Let&apos;s build something together.
            </Title>

            <Paragraph className="section-text">
              I&apos;m open to collaborations, research projects, and full-stack / geospatial
              work — especially anything involving satellite imagery, GNSS, and high-impact data systems.
            </Paragraph>

            {/* Highlight card */}
            <div className="contact-highlight-card">
              <div className="contact-highlight-aurora" />
              <Text className="contact-highlight-title">
                Preferred topics
              </Text>
              <ul className="contact-list">
                <li>Geospatial & remote sensing applications</li>
                <li>GNSS / RTK / NTRIP systems</li>
                <li>Full-stack dashboards & APIs</li>
                <li>Research collaborations & prototypes</li>
              </ul>
            </div>

            {/* Contact Info Pills */}
            <Space direction="vertical" size="middle" className="contact-info-group">
              <div className="contact-info-row">
                <div className="contact-pill">
                  <MailOutlined className="contact-pill-icon" />
                  <a href="mailto:punnawit.kot@ku.th" className="contact-pill-text">
                    punnawit.kot@ku.th
                  </a>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-pill">
                  <LinkedinOutlined className="contact-pill-icon" />
                  <a
                    href="https://www.linkedin.com/in/punnawit-kotosri-475406306"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-pill-text"
                  >
                    LinkedIn Profile
                  </a>
                </div>

                <div className="contact-pill">
                  <GithubOutlined className="contact-pill-icon" />
                  <span className="contact-pill-text">GitHub (on request)</span>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-pill small">
                  <EnvironmentOutlined className="contact-pill-icon" />
                  <span className="contact-pill-text">Bangkok · Thailand (Remote-friendly)</span>
                </div>
              </div>
            </Space>
          </motion.div>
        </Col>

        {/* RIGHT SIDE – Form */}
        <Col xs={24} md={12}>
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="contact-form"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="your@email.com" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter a message" }]}
              >
                <TextArea rows={4} placeholder="Tell me about your project, idea, or problem…" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
