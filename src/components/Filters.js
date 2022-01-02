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
            onChange={handlers.bug}
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
            onChange={handlers.doc}
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
            onChange={handlers.gfi}
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
            onChange={handlers.hw}
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
            onChange={handlers.js}
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
          <p className="label ml-3">Javascript</p>
        </div>
        <div className="d-flex flex-row align-items-center mb-1">
          <Switch
            checked={values.java}
            onChange={handlers.java}
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
            onChange={handlers.php}
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
            onChange={handlers.python}
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
            onChange={handlers.ruby}
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
            onChange={handlers.swift}
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
