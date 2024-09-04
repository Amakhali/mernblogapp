/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import classes from './styles.module.css'
import { GlobalContext } from '../../context'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'

export default function AddNewBlog() {

    const { formData, setFormData, setIsEdit, isEdit } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleOnClick() {
        const response = isEdit ? await axios.put(`https://mernbackend-sxvn.onrender.com/api/blogs/update/${location.state.getCurrentItem._id}`,{
            title:formData.title,
            description: formData.description,
        }) : await axios.post('https://mernbackend-sxvn.onrender.com/api/blogs/add', {
            title: formData.title,
            description: formData.description,
        });

        const result = await response.data;

        if (result) {
            setIsEdit(false)
            setFormData({
                title: " ",
                description: " ",
            });
            navigate('/');
        }

    }

    useEffect(() => {
        if (location.state) {
            const { getCurrentItem } = location.state;
            setIsEdit(true)
            setFormData({
                title: getCurrentItem.title,
                description: getCurrentItem.description
            })
        }
    }, [location])

    return (
        <div className={classes.wrapper}>
            <h1>
                {isEdit ? 'Edit a Blog' : 'Add a Blog'}
            </h1>
            <div className={classes.formWrapper}>
                <input
                    name='title'
                    placeholder='Enter Blog Title'
                    id='title'
                    type='text'
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
                />
                <textarea
                    name='description'
                    placeholder='Enter blog description'
                    id='description'
                    value={formData.description}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            description: event.target.value
                        })
                    }
                />
                <button onClick={handleOnClick}
                className={classes.button}
                >
                    {
                        isEdit ? 'Edit Blog' : 'Add Blog'
                    }
                </button>
            </div>
        </div>
    )
}