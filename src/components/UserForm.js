import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  List,
  Modal,
  Checkbox,
  Select,
  Row,
  Col,
  notification,
  Card,
} from "antd";
import "../App.css";

const { Option } = Select;

const UserForm = () => {
  const [form] = Form.useForm();
  const [addresses, setAddresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddresses, setEditingAddresses] = useState([]);

  const addAddress = () => {
    form
      .validateFields(["city", "state", "houseNo", "country"])
      .then((values) => {
        setAddresses([
          ...addresses,
          { ...values, status: "valid", key: Date.now() },
        ]);
        form.resetFields(["city", "state", "houseNo", "country"]);
      })
      .catch((errorInfo) => {
        notification.error({
          message: "Validation Error",
          description: "Please check the address fields",
        });
      });
  };

  const submitForm = () => {
    form
      .validateFields(["name", "age"])
      .then((values) => {
        const user = {
          ...values,
          addresses,
          key: Date.now(),
        };
        setUsers([...users, user]);
        setAddresses([]);
        form.resetFields();
      })
      .catch((errorInfo) => {
        notification.error({
          message: "Validation Error",
          description: "Please check the form fields",
        });
      });
  };

  const editAddresses = () => {
    setIsEditing(true);
    setEditingAddresses(
      addresses.map((address) => ({ ...address, checked: false }))
    );
  };

  const applyEditAddresses = () => {
    setAddresses(editingAddresses.map(({ checked, ...rest }) => rest));
    setIsEditing(false);
  };

  const handleAddressChange = (key, field, value) => {
    setEditingAddresses(
      editingAddresses.map((address) =>
        address.key === key ? { ...address, [field]: value } : address
      )
    );
  };

  const handleDeleteAddresses = () => {
    setAddresses(
      addresses.filter(
        (address) =>
          !editingAddresses.some(
            (editAddress) =>
              editAddress.key === address.key && editAddress.checked
          )
      )
    );
    setIsEditing(false);
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please enter your age" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ message: "Please enter city" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ message: "Please enter state" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="houseNo"
              label="House No"
              rules={[{ message: "Please enter house number" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ message: "Please enter country" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="dashed" onClick={addAddress}>
          Add Address
        </Button>
        <Form.Item>
          <Button className="sumbit-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {addresses.length > 0 ? (
        <>
          <List
            className="AddressList"
            header={<div>Addresses</div>}
            bordered
            dataSource={addresses}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() =>
                      handleAddressChange(
                        item.key,
                        "status",
                        item.status === "valid" ? "invalid" : "valid"
                      )
                    }
                  >
                    {item.status === "valid"
                      ? "Mark as Invalid"
                      : "Mark as Valid"}
                  </Button>,
                ]}
              >
                {`${item.houseNo}, ${item.city}, ${item.state}, ${item.country} (${item.status})`}
              </List.Item>
            )}
          />
          <Button type="dashed" onClick={editAddresses}>
            Edit Addresses
          </Button>
        </>
      ) : null}

      <Modal
        title="Edit Addresses"
        visible={isEditing}
        onOk={applyEditAddresses}
        onCancel={() => setIsEditing(false)}
        footer={[
          <Button key="delete" type="danger" onClick={handleDeleteAddresses}>
            Delete Selected
          </Button>,
          <Button key="apply" type="primary" onClick={applyEditAddresses}>
            Apply
          </Button>,
        ]}
      >
        <List
          dataSource={editingAddresses}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                checked={item.checked}
                onChange={(e) =>
                  handleAddressChange(item.key, "checked", e.target.checked)
                }
              />
              <span>{`${item.houseNo}, ${item.city}, ${item.state}, ${item.country} (${item.status})`}</span>
              <Select
                value={item.status}
                onChange={(value) =>
                  handleAddressChange(item.key, "status", value)
                }
                style={{ marginLeft: "10px" }}
              >
                <Option value="valid">Valid</Option>
                <Option value="invalid">Invalid</Option>
              </Select>
            </List.Item>
          )}
        />
      </Modal>

      {users.length > 0 ? (
        <List
          className="userList"
          header={<div>Users</div>}
          bordered
          dataSource={users}
          renderItem={(user) => (
            <div className="abc">
              <List.Item>
                <Card
                  title={user.name}
                  className="card"
                  style={{
                    width: 300,
                  }}
                >
                  <p>Age: {user.age}</p>
                  <List
                    header={<div>Addresses</div>}
                    bordered
                    dataSource={user.addresses}
                    renderItem={(address) => (
                      <List.Item>
                        {`${address.houseNo}, ${address.city}, ${address.state}, ${address.country} (${address.status})`}
                      </List.Item>
                    )}
                  />
                </Card>
              </List.Item>
            </div>
          )}
        />
      ) : null}
    </div>
  );
};

export default UserForm;
