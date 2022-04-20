/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthTokenClass } from '../token/token'
export interface NbStrategyToken {
    class?: NbAuthTokenClass
    [key: string]: any
}
export declare class NbAuthStrategyOptions {
    name: string
    token?: NbStrategyToken
}
