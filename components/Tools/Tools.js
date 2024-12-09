import styles from "../../styles/Tools.module.css"
import { motion } from "framer-motion"

export const AuthCard = ({ logo, children }) => (
    <div className={styles.logo} >
        <div>{logo}</div>

        <div className={styles.authCard}>
            {children}
        </div>
    </div>
)


export const Button = ({ type = 'submit', className, ...props }) => (
    <motion.button
        type={type}
        className={styles.button}
        {...props}
        whileHover={{scale:1.1}}
    ></motion.button>
)

export const Input = ({className='',  ...props }) => (
    <motion.input
        
        className={styles.input}
        {...props}
        whileFocus={{scale:1.002}}
        whileHover={{scale:1.002}}
    />
)

export const InputError = ({ messages = []}) => (
    <>
        {messages.length > 0 && (
            <>
                {messages?.map((message, index) => (
                    <p
                        className={styles.inputError}
                        key={index}>
                        {message}
                    </p>
                ))}
            </>
        )}
    </>
)
export const InputSuccess = ({ success}) => (
    <>
 
                    <h4 className={styles.inputSuccess}>
                        {success}
                    </h4>
                
    </>
)

export const Label = ({children, ...props }) => (
    <label
        className={styles.label}
        {...props}>
        {children}
    </label>
)


