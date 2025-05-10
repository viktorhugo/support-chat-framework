import React from 'react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'

const TestingPage = () => {
    return (
        <>
            <div>TestingPage</div>
            <Button >
                <Link to="/auth/login">Go to Login</Link>
            </Button>
        </>
    )
}

export default TestingPage