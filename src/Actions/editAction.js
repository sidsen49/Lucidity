export const EDIT_ACTION = 'EDIT_ACTION';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';

// This action creator edits the selected product data.
export const editAction = (data) => {
    return {
        type: EDIT_ACTION,
        payload: data
    }
}

// This action creator toggles the editting model.
export const toggleEdit = (isEnable) => {
    return {
        type: TOGGLE_EDIT,
        payload: isEnable
    }
}
