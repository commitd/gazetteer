import React from 'react'
import { Match } from '../../types/server-types'
import { Heading } from '@committed/components'
import { AnnotationViewer } from '@committed/annotation-viewer'

export interface TestResultProps {
  text: string
  results: Match[]
}

/**
 * TestResult component
 */
export const TestResult: React.FC<TestResultProps> = ({
  text,
  results,
}: TestResultProps) => (
  <>
    <Heading.h1>Results</Heading.h1>
    <AnnotationViewer text={text} marks={results} inlines={[]} />
  </>
)
