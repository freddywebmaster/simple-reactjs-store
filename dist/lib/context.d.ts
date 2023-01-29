import React from 'react';
import { FullSlice } from '../hooks/useSimpleStore';
import { SubjectManager } from './subject-manager';
export declare const subjectMounted: SubjectManager;
export declare const RootContext: React.Context<{
    root: any;
    store: any;
    mounted: string[];
}>;
export declare function SimpleStateProvider(props: {
    children: JSX.Element;
    store: FullSlice<any>[];
}): JSX.Element;
