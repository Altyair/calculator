/**
 *
 * Observer
 *
 *
 */
export default class EventEmitter {
    constructor() {
        this._subscribers = {};
    }

    emit( data ) {
        const event = data.event;

        if ( this._subscribers.hasOwnProperty( event) ) {
            for ( let subscriber of this._subscribers[event] ) {
                subscriber( data.message );
            }
        }
    }

    subscribe( event, callback ) {
        if ( !this._subscribers.hasOwnProperty( event )) {
            this._subscribers[event] = [];
        }
        this._subscribers[event].push( callback );
    }
}
