// import React, { useEffect,useState } from 'react';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import firebase from './utils/firebase'
import { getDatabase, ref, get, set, push } from "firebase/database";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'

import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Decoupled from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
// import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Font from '@ckeditor/ckeditor5-font/src/font';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import TextPartLanguage from '@ckeditor/ckeditor5-language/src/textpartlanguage';
function EditPage() {
    function SpecialCharactersEmoji(editor) {
        editor.plugins.get('SpecialCharacters').addItems('Emoji', [
            { title: 'smiley face', character: '😊' },
            { title: 'rocket', character: '🚀' },
            { title: 'wind blowing face', character: '🌬️' },
            { title: 'floppy disk', character: '💾' },
            { title: 'heart', character: '❤️' }
        ]);
    }
    const editorConfiguration = {
        plugins: [
            Autoformat,
            BlockQuote,
            Bold,
            CKBox,
            CloudServices,
            Essentials,
            Heading,
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            ImageResize,
            Alignment,
            Decoupled,
            Indent,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            PictureEditing,
            Table,
            TableToolbar,
            TextTransformation,
            // ExportPdf,
            FindAndReplace,
            Underline,
            Strikethrough,
            Code,
            Subscript,
            Superscript,
            Font,
            RemoveFormat,
            SourceEditing,
            TodoList,
            Highlight,
            CodeBlock,
            HtmlEmbed,
            SpecialCharacters,
            SpecialCharactersEssentials,
            SpecialCharactersEmoji,
            HorizontalLine,
            PageBreak,
            TextPartLanguage
        ],
        toolbar: {
            items: [
                'ckbox', 'uploadImage', '|',
                'exportPDF', 'exportWord', '|',
                'findAndReplace', 'selectAll', '|',
                'heading', '|',
                'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                'bulletedList', 'numberedList', 'todoList', '|',
                'outdent', 'indent', '|',
                'undo', 'redo',
                '-',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                'alignment', '|',
                'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                'textPartLanguage', '|',
                'sourceEditing'
            ],
            shouldNotGroupWhenFull: true
        },
        language: {
            textPartLanguage: [
                { title: 'Arabic', languageCode: 'ar' },
                { title: 'French', languageCode: 'fr' },
                { title: 'Hebrew', languageCode: 'he' },
                { title: 'Chinese', languageCode: 'zh-cn' },
                { title: 'Spanish', languageCode: 'es' }
            ]
        },
        image: {
            resizeUnit: "%",
            resizeOptions: [
                {
                    name: 'resizeImage:original',
                    value: null,
                    label: 'Original'
                },
                {
                    name: 'resizeImage:50',
                    value: '50',
                    label: '50%'
                },
                {
                    name: 'resizeImage:75',
                    value: '75',
                    label: '75%'
                }
            ],
            toolbar: [
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:align-block-left',
                'imageStyle:align-block-right',
                'imageStyle:side',
                'resizeImage'
            ],
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        mediaEmbed: {
            previewsInData: true
        },
        ckbox: {
            tokenUrl: 'https://92457.cke-cs.com/token/dev/7Qva3EjlHxzZ2zNC9dkcQpsj9PL7FufjBYqd?limit=10 '
        }
    };
    const [PostContent, setPostContent] = useState('')
    const [Postkey, setPostkey] = useState(0)
    const [PostTitle, setPostTitle] = useState('')
    const [CKEditorInitData, setCKEditorInitData] = useState('')
    const [OriginData, setOriginData] = useState('')
    let clearEffect = useRef(true)
    const [urlQueryString] = useState(useQuery().get("id"))
    // Initialize Firebase
    const location = useLocation()
    const database = getDatabase(firebase);

    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    useEffect(() => {
        console.log(urlQueryString)
        if (location.search !== "" && clearEffect.current) {
            get(ref(database, urlQueryString)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    setCKEditorInitData(snapshot.val().postContent)
                    setOriginData(snapshot.val())
                    setPostTitle(snapshot.val().postTitle)
                    //初始化CKediter編輯器
                    setPostkey(pre => pre + 1)
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            setPostkey(pre => pre + 1)
            setCKEditorInitData('')
            setPostTitle('')
        }
        clearEffect.current = false
    }, [database, location, urlQueryString])

    function submitPost() {

        if (PostTitle === "") {
            Swal.fire({
                icon: 'error',
                title: '請輸入標題唷😊',
                confirmButtonText: '我知道惹~'
            })
            return
        }
        if (PostTitle.length > 0) {
            Swal.fire({
                title: '確認送出文章嗎?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '送出',
                cancelButtonText: '取消',
            }).then((result) => {
                if (result.isConfirmed) {
                    const Today = new Date();
                    if (urlQueryString) {
                        set(ref(database, urlQueryString), {
                            postTitle: PostTitle,
                            postContent: PostContent,
                            date: OriginData.date,
                            timeStamp: OriginData.timeStamp,
                        })
                        setCKEditorInitData('')
                    } else {
                        push(ref(database), {
                            postTitle: PostTitle,
                            postContent: PostContent,
                            date: `${Today.getFullYear()}-${Today.getMonth() + 1}-${Today.getDate()}`,
                            timeStamp: Date.now()
                        });
                    }
                    //初始化CKediter編輯器
                    setPostTitle('')
                    setPostkey(pre => pre + 1)
                    Swal.fire({
                        title: '文章已送出!',
                        icon: 'success',
                        confirmButtonText: '好~'
                    })
                }
            })
        }
    }

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <div className='d-flex align-items-center mb-3'>
                        <span>文章標題：</span>
                        <div className="input-outline-x">
                            <input className="input-control input-outline" placeholder="標題" type="text" value={PostTitle} onChange={(e) => setPostTitle(e.target.value)} onBlur={(e) => setPostTitle(e.target.value)} />
                            <label className="input-label">標題</label>
                        </div>
                    </div>
                    <div className='mb-3'>
                        {/* <CKEditor
                        initData={CKEditorInitData}
                        key={Postkey}
                        onChange={ ( { editor } ) => {  
                            setPostContent(editor.getData())
                        } }
                        onBlur={
                            ( { editor } ) => {
                                setPostContent(editor.getData())
                            }
                        }
                        /> */}
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            data={CKEditorInitData}
                            key={Postkey}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            }}
                            onChange={(event, editor) => {
                                setPostContent(editor.getData())
                            }}
                            onBlur={(event, editor) => {
                                setPostContent(editor.getData())
                            }}
                        // onFocus={ ( event, editor ) => {
                        // } }
                        />
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                        <button className="btn btn-primary text-uppercase" onClick={() => {
                            submitPost()
                        }}>送出</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditPage;