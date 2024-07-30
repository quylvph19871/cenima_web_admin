import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from "../../services/userSevice"
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())

        }
    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())

        }
    }
}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})


export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: 'CREATE_USER_START'
            // })
            let res = await createNewUserService(data)
            console.log('check user redux', res);
            if (res && res.errCode === 0) {
                toast.success('Tạo người dùng thành công')
                dispatch(createNewUserSuccess(res.data))
                dispatch(fetchAllUserStart())
            } else {
                dispatch(createNewUserFailed())
                toast.error('Tạo người dùng thất bại')

            }
        } catch (error) {
            toast.error('Tạo người dùng thất bại')

            dispatch(createNewUserFailed())

        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL")
            console.log('check ', res);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())

        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            console.log('check user redux', res);
            if (res && res.errCode === 0) {
                toast.success('Xóa người dùng thành công')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Xóa người dùng thất bại')

                dispatch(deleteUserFailed())
            }
        } catch (error) {
            toast.error('Xóa người dùng thất bại')

            dispatch(deleteUserFailed())

        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS

})


export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED

})

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            console.log('check user redux', res);
            if (res && res.errCode === 0) {
                toast.success('Sửa người dùng thành công')
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Sửa người dùng thất bại')

                dispatch(editUserFailed())
            }
        } catch (error) {
            toast.error('Sửa người dùng thất bại')

            dispatch(editUserFailed())

        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS

})


export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED

})
