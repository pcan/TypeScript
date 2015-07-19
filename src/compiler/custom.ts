
namespace ts {

    export let customChecker: CustomChecker = null;
    export let customEmitter: CustomEmitter = null;

    export interface CustomChecker {
        checkType(node: Type): boolean;
    }


    export interface CustomEmitter {
        emitNodeMetadata(node: Type): string;
    }


    function recursiveTypeNameLookup(type: Type): string {
        if (type) {
            var s = type.symbol;
            var baseTypes: ObjectType[];
            if (s) {
                if (s.name === 'IRootScopeService') {
                    return '\'$scope\'';
                }
                baseTypes = (<InterfaceType>type).resolvedBaseTypes;
                if (baseTypes && baseTypes.length > 0) {
                    for (var i = 0; i < baseTypes.length; i++) {
                        return recursiveTypeNameLookup(baseTypes[i]);
                    }
                }
            }
        }
        return '';
    }


    class MyEmitter implements CustomEmitter, CustomChecker {

        checkType(node: Type): boolean {
            return recursiveTypeNameLookup(node) !== '';
        }

        emitNodeMetadata(node: Type): string {
            return recursiveTypeNameLookup(node);
        }

    }

    var myEmitter = new MyEmitter();
    customChecker = myEmitter;
    customEmitter = myEmitter;

}
