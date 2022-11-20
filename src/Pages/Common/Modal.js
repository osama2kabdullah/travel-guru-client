import React from "react";
import Button from "./Button";

const Modal = ({ showModal, setShowModal, proccedAction, updateOrAdd }) => {
  const form = showModal?.[3];
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="">
              {/*content*/}
              <div className=" rounded-lg p-4 shadow-lg relative flex flex-col w-full bg-white ">
                {/*form*/}

                {form?.length > 0 || (
                  <h3 className="text-md mb-5">Ok, Confirm to Procced?</h3>
                )}

                {form?.length > 0 && (
                  <form onSubmit={e=>{
                    e.preventDefault();
                    updateOrAdd(e.target, showModal)
                    }} className="grid gap-5">
                    <div className="grid grid-cols-2 gap-5">
                      {form?.map((form) => (
                        <input
                          className="outline-0 border p-2 rounded"
                          type={
                            form === "cost"
                              ? "number"
                              : form === "email"
                              ? "email"
                              : form === "picture"
                              ? "file":'text'
                          }
                          name={form}
                          placeholder={form}
                          id=""
                          required={showModal[0] === 'Add this'}
                        />
                      ))}
                    </div>
                    <Button>{showModal[0]}</Button>
                  </form>
                )}
                <div className="flex items-center justify-between p-2">
                  <button
                    className="text-red-500 font-bold "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  {form?.length > 0 || (
                    <button
                      className="bg-orange-500 text-white p-2 rounded-md"
                      type="button"
                      onClick={() => proccedAction(showModal)}
                    >
                      {showModal?.[0]}
                    </button>
                  )}
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
