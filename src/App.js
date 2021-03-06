import "./App.css";

import { useState,useEffect } from "react";

import {
  Collapse,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  notification,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

function App() {
  const [componentSize] = useState("Large");
  const [newStickTitle, setNewStickTitle] = useState("");
  const [newStickDescription, setNewStickDescription] = useState("");
  const [newStickPriority, setNewStickPriority] = useState(0);
  const [newStickDate, setNewStickDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sticky, setSticky] = useState([]);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => setIsModalVisible(false);

  const handleCancel = () => setIsModalVisible(false);

  const openNotification = (title, description) => {
    notification.open({
      message: `New Stick ${title}`,
      description: `${description.slice(0, 10)}`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
useEffect(() =>localStorage.getItem('sticks') 
  ? null : localStorage.setItem('sticks',JSON.stringify(sticky)), [sticky]);
  return (
    <div className="App">
      <div className="App-Header">
        <Button type="primary" onClick={showModal}>
          New Stick
        </Button>
        <Modal
          title="New Stick"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={(e) => {
                handleOk();
                setSticky(c => [...c,
                  {
                    title: newStickTitle,
                    description: newStickDescription,
                    date: newStickDate,
                    priority: newStickPriority,
                  },
                ]);
                openNotification(newStickTitle, newStickDescription);
                
                localStorage.setItem('sticks',JSON.stringify(sticky))
                
              }}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            size={componentSize}
          >
            <Form.Item label="Title">
              <Input onChange={(e) => setNewStickTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                onChange={(e) => setNewStickDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker
                onChange={(e) => {
                  const date = JSON.stringify(e._d);
                  setNewStickDate(`Date: ${date.split("T")[0]}`);
                }}
              />
            </Form.Item>

            <Form.Item label="Priority">
              <InputNumber
                min={0}
                max={10}
                defaultValue={0}
                onChange={(e) => setNewStickPriority(e)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="site-card-border-less-wrapper">
        {sticky.map((e, i) => (
          <Collapse defaultActiveKey={i}>
            <Panel header={e.title} key={i}>
              <span>priority{e.priority}</span>
              <p>{e.description}</p>
              <p>{e.date}</p>
            </Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
}

export default App;
