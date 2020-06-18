import Axios from 'axios';

const SERVER = 'http://localhost:8000';

export const listTodos = async () => {

    const resp = await Axios.get(`${SERVER}/todos/`);

    if( resp.status === 200 ) {
        return {
            success: true,
            message: 'OK',
            data: resp.data,
        };
    }else {
        return {
            success: false,
            message: resp.statusText,
            data: resp.data,
        };
    }
}

export const createTodo = async (body) => {

    const resp = await Axios.post(`${SERVER}/todos/`, body);

    if( resp.status === 201 ) {
        return {
            success: true,
            message: 'OK',
            data: resp.data,
        };
    }else {
        return {
            success: false,
            message: resp.statusText,
            data: resp.data,
        };
    }
}

export const updateTodo = async (id, body) => {

    const resp = await Axios.put(`${SERVER}/todos/${id}`, body);

    if( resp.status === 200 ) {
        return {
            success: true,
            message: 'OK',
            data: resp.data,
        };
    }else {
        return {
            success: false,
            message: resp.statusText,
            data: resp.data,
        };
    }
}

export const deleteTodos = async (id) => {

    const resp = await Axios.delete(`${SERVER}/todos/${id}`);

    if( resp.status === 204 ) {
        return {
            success: true,
            message: 'OK',
            data: resp.data,
        };
    }else {
        return {
            success: false,
            message: resp.statusText,
            data: resp.data,
        };
    }
}
