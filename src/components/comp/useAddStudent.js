import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CSVReader from 'react-csv-reader'


const AddStudent = () => {
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [result, setResult] = useState("")
    const [allCourses, setAllCourses] = useState([])
    const [isCsvSelected, setIsCsvSelected] = useState(false)

    const [courseName, setCourseName] = useState(["WEB", "React", "Datastructure"])
    const [courseDetails, setCourseDetails] = useState({
        course_name: "",
        final_score: ""
    })

    useEffect(() => {

    }, [])
    const resetfun = () => {
        setIsCsvSelected(false)
        resetfun()
        setAllCourses([])
        setName("")
        setBatch("")
        setResult("")
    }
    const onChangeFun = (e) => {
        setCourseDetails({
            ...courseDetails,
            [e.target.name]: e.target.value
        })
    }
    const addCourseSave = () => {
        if (!courseDetails.course_name || !courseDetails.final_score) {
            toast.warning("Please fill course name and final score")
            return
        }
        setAllCourses([...allCourses, courseDetails])
        resetCourse()
        let filtercourseName = courseName.filter(val => val != courseDetails.course_name)
        setCourseName((previous => {
            return [...filtercourseName]
        }))
    }
    const resetCourse = () => {
        setCourseDetails({
            course_name: "",
            final_score: ""
        })
    }
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }
    const handleForce = (event) => {

        let courseData = [
            { course_name: "WEB", final_score: event[0].web_score },
            { course_name: "React", final_score: event[0].react_score },
            { course_name: "Datastructure", final_score: event[0].datastruecture_score }

        ]
        setName(event[0].name)
        setBatch(event[0].batch)
        setResult(event[0].result)
        setAllCourses(courseData)
        setIsCsvSelected(true)

    }
    let render = (
        <div>
            {!isCsvSelected ?
                <div className="csv-upload-section">
                    <div className="header-sec">
                        <h2>Add Details</h2>
                        <button className="btn btn-info">
                            <a target="_blank" href="./coddingNinjaStudentdetails.csv">Download CSV format</a>
                        </button>
                    </div>
                    <div className="csv-upload">

                    <CSVReader
                        cssClass="csv-reader-input"
                        label="Select CSV for student data"
                        onFileLoaded={handleForce}
                        
                        // onError={this.handleDarkSideForce}
                        parserOptions={papaparseOptions}
                        inputId="ObiWan"
                        inputName="ObiWan"
                        inputStyle={{ color: 'red' }}
                        />
                        </div>
                </div>
                :
                <form>
                    <div class="mb-2">
                        <label for="name" class="form-label">Name*</label>
                        <input type="name" name="name" value={name} onChange={(e) => setName(e.target.value)} class="form-control" id="name" />
                    </div>
                    <div class="mb-2">
                        <label for="batch" class="form-label">Batch*</label>
                        <input type="batch" name="batch" value={batch} onChange={(e) => setBatch(e.target.value)} class="form-control" id="batch" />
                    </div>
                    <div class="mb-2">
                        <label for="result" class="form-label">Result*</label>
                        <input type="result" class="form-control" name="result" value={result} onChange={(e) => setResult(e.target.value)} id="result" />
                    </div>
                    {allCourses.length > 0 &&
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Course Name</th>
                                    <th scope="col">Final Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCourses?.map((val, index) => (
                                    <tr>
                                        <>
                                            <th scope="row">{index + 1}</th>
                                            <td>{val.course_name}</td>
                                            <td>{val.final_score}</td>
                                        </>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }

                </form>
            }
            <ToastContainer />
        </div>
    )
    return {
        render,
        studentDetails: { name: name, batch: batch, result: result, course_scores: allCourses },
        resetfun: resetfun

    }
}

export default AddStudent