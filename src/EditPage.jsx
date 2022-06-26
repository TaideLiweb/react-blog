import React from 'react';
import {CKEditor} from 'ckeditor4-react';
// const { useEffect, useState, useReducer, useMemo } = React;
const { useState } = React;

function EditPage() {
    const [EditData,setEditData] = useState('')

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <CKEditor
                    onChange={ ( { editor } ) => {
                        setEditData(editor.getData())
                    } }
                    />
                    <div>
                        {EditData}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPage;