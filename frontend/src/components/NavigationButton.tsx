import { useLocation, useNavigate } from "react-router-dom"

const NavigationButton = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const isAddTaskPage = location.pathname === '/'

    const handleClick = () => {
        if (isAddTaskPage) {
            navigate('/tasks')
        }
        else {
            navigate('/')
        }
    }


  return (
     <button
        onClick={handleClick}
        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {isAddTaskPage? 'View Tasks': 'Add Task' }
      </button>
  );
}

export default NavigationButton