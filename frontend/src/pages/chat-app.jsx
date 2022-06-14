import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { socketService,  SOCKET_EMIT_SEND_MSG} from '../services/socket.service'

function _ChatApp({ loggedInUser }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('Love')
    const [isBotMode, setIsBotMode] = useState(false)
    let timeout;

    useEffect(() => {
        // socketService.setup();
        socketService.emit('chat topic', topic);
        socketService.off(SOCKET_EMIT_SEND_MSG);
        socketService.on(SOCKET_EMIT_SEND_MSG, addMsg);
        return () => {
            socketService.off(SOCKET_EMIT_SEND_MSG, addMsg)
            // socketService.terminate()
            clearTimeout(timeout)
        }
    }, [isBotMode])

    useEffect(() => {
        changeTopic()
    }, [topic])

    const addMsg = (newMsg) => {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        console.log('from addMsg', isBotMode);
        if (isBotMode) sendBotResponse();
    }

    const sendBotResponse = () => {
        // Handle case: send single bot response (debounce).
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are beautifull!' }]))
            setMsgs()
        }, 1500)
    }

    const changeTopic = () => {
        socketService.emit('chat topic', topic)
    }

    const sendMsg = ev => {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        socketService.emit('chat newMsg', { from, txt: msg.txt, isBotMode })
        setMsg({ from: 'Me', txt: '' })
    }

    const handleChange = ev => {
        const { value } = ev.target
        setTopic(value)
    }

    const msgHandleChange = ev => {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    const toggleIsBotMode = (ev) => {
        console.log(ev.target.checked)
        setIsBotMode(ev.target.checked)
    }
    console.log('from render', isBotMode)

    return (
        <div className="chat">
            <h2>Lets Chat about {topic}</h2>

            <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={toggleIsBotMode} />
                Bot Mode
            </label>

            <div>
                <label>
                    <input type="radio" name="topic" value="Love"
                        checked={topic === 'Love'} onChange={handleChange} />
                    Love
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Politics"
                        checked={topic === 'Politics'} onChange={handleChange} />
                    Politics
                </label>

            </div>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={msgHandleChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.user
    }
}
const mapDispatchToProps = {
}

export const ChatApp = connect(mapStateToProps, mapDispatchToProps)(_ChatApp)