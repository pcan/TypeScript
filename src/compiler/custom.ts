
namespace ts {

    export interface CustomInterfaceEmitter {
        emitInterfaceMetadata(node: Type): string;
    }
    
    function recursivelyBuildInterfaceObject(type: Type) {
        if (type) {
            var interfaceObj : any = {__i:type.symbol.name};
            var baseTypes: ObjectType[] = (<InterfaceType>type).resolvedBaseTypes;
            var baseInterfaces : any[] = [];
            if (baseTypes && baseTypes.length > 0) {
                for (var i = 0; i < baseTypes.length; i++) {
                    baseInterfaces.push(recursivelyBuildInterfaceObject(baseTypes[i]));
                }
                interfaceObj.__base = baseInterfaces;
            }
            return interfaceObj;
        }
    }
    
    class JsonObjInterfaceEmitter implements CustomInterfaceEmitter {

        emitInterfaceMetadata(node: Type): string {
            return JSON.stringify(recursivelyBuildInterfaceObject(node));
        }

    }
    
    export let customInterfaceEmitter: CustomInterfaceEmitter = new JsonObjInterfaceEmitter();

}
