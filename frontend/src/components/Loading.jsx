import React from 'react';
import LoadingIcon from '../assets/svg/loading.svg';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-auto w-auto">
            <img
                src={LoadingIcon}
                alt="Loading"
                className="animate-spin w-10 h-10"
            />
        </div>
    );
}

export default Loading;
