import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, InfoIcon } from 'lucide-react';

const alertStyles = {
  success: {
    icon: CheckCircle2,
    container: 'bg-green-50 border-l-4 border-green-500',
    iconClass: 'text-green-500',
    titleClass: 'text-green-800'
  },
  error: {
    icon: XCircle,
    container: 'bg-red-50 border-l-4 border-red-500',
    iconClass: 'text-red-500',
    titleClass: 'text-red-800'
  },
  warning: {
    icon: AlertCircle,
    container: 'bg-yellow-50 border-l-4 border-yellow-500',
    iconClass: 'text-yellow-500',
    titleClass: 'text-yellow-800'
  },
  info: {
    icon: InfoIcon,
    container: 'bg-blue-50 border-l-4 border-blue-500',
    iconClass: 'text-blue-500',
    titleClass: 'text-blue-800'
  }
};

const AlertPopup = ({
                       type = 'info',
                       title,
                       message,
                       position = 'top-right',
                       duration = 0,
                       onClose,
                       className = ''
                     }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isExiting, setIsExiting] = React.useState(false);
  const style = alertStyles[type];
  const Icon = style.icon;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed ${positionClasses[position]} z-50
        transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
        ${className}
      `}
    >
      <div className={`
        ${style.container}
        p-4 rounded-lg shadow-lg
        max-w-md w-full
        flex items-start
        transform transition-transform duration-200 hover:scale-[1.02]
      `}>
        <Icon className={`${style.iconClass} h-6 w-6 mt-0.5 flex-shrink-0`} />

        <div className="ml-3 flex-grow">
          {title && (
            <h3 className={`${style.titleClass} text-lg font-semibold mb-1`}>
              {title}
            </h3>
          )}
          <p className="text-gray-700">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600
                   transition-colors duration-200 focus:outline-none"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;


/**
 * const App = () => {
 *   const [showAlert, setShowAlert] = React.useState(false);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setShowAlert(true)}>
 *         Show Alert
 *       </button>
 *
 *       {showAlert && (
 *         <CustomAlert
 *           type="success"
 *           title="Success!"
 *           message="Your changes have been saved."
 *           position="top-right"
 *           duration={5000}
 *           onClose={() => setShowAlert(false)}
 *         />
 *       )}
 *     </div>
 *   );
 * };
 */