import React from "react";
import Switch from "react-switch";

const Filters = ({ values, handlers }) => {
  return (
    <>
      <div className="labels">
        <div className="lablang mb-2">Labels:</div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.bug}
            onChange={() => {
              handlers.bug(!values.bug);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Bug</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.doc}
            onChange={() => {
              handlers.doc(!values.doc);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Documentation</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.gfi}
            onChange={() => {
              handlers.gfi(!values.gfi);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Good First Issue</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.hw}
            onChange={() => {
              handlers.hw(!values.hw);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Help Wanted</p>
        </div>
      </div>
      <div className="languages mt-4">
        <div className="lablang mb-2">Languages:</div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.js}
            onChange={() => {
              handlers.js(!values.js);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">JavaScript</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.java}
            onChange={() => {
              handlers.java(!values.java);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Java</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.php}
            onChange={() => {
              handlers.php(!values.php);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">PHP</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.python}
            onChange={() => {
              handlers.python(!values.python);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Python</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.ruby}
            onChange={() => {
              handlers.ruby(!values.ruby);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Ruby</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.swift}
            onChange={() => {
              handlers.swift(!values.swift);
              handlers.page(1);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#f74700"
            onHandleColor="#fff"
            offColor="#fbd38f"
            offHandleColor="#f74700"
            handleDiameter={15}
            width={40}
            height={20}
            activeBoxShadow={null}
          />
          <p className="label ml-3">Swift</p>
        </div>
      </div>
    </>
  );
};

export default Filters;
