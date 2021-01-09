import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { NavigatorSavedSearch } from './utils/NavigatorSavedSearch';

export class NavigatorSearchesParser implements IMessageParser
{
    private _searches: NavigatorSavedSearch[];

    public flush(): boolean
    {
        this._searches = [];

        return true;
    }
    
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalSearches = wrapper.readInt();

        while(totalSearches > 0)
        {
            this._searches.push(new NavigatorSavedSearch(wrapper));

            totalSearches--;
        }
        
        return true;
    }

    public get searches(): NavigatorSavedSearch[]
    {
        return this._searches;
    }
}