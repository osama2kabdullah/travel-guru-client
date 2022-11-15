import React from 'react';

const Modal = ({showModal, setShowModal, proccedAction}) => {
    return (
        <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl">
                    Ok, Confirm to Procced?
                  </h3>
                </div>
                <div className="flex items-center justify-between p-2">
                  <button
                    className="text-red-500 font-bold "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-orange-500 text-white p-2 rounded-md"
                    type="button"
                    onClick={() => proccedAction(showModal)}
                  >
                    {showModal[0]}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    );
};

export default Modal;