learimport React, { useCallback, useContext, useState } from "react";
import { Handle, Position } from "reactflow";
import { FlowChartContext } from "../utils/contexts/FlowChartContext";

const TextNode: React.FC<any> = (props) => {
    const { nodes, handleAddOneNode, handleAddTwoNode, handleDeleteNode } = useContext(FlowChartContext);
    const [label, setLabel] = useState<string>('');
    const onChange = useCallback((evt: any) => {
        setLabel(evt.target.value)
    }, []);
    return (
        <div className="hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
            <Handle type="target" position={Position.Top} id={Position.Top} />
            <div className="flex flex-col items-center justify-center space-y-2 px-4 py-2 bg-white rounded-lg">
                <input id="text" placeholder="Enter Label" name="text" value={label} onChange={onChange} className="nodrag h-8 text-center border border-black rounded-lg" style={{ outline: 'none' }} />
                <div className="flex space-x-2">
                    <div className="flex items-center justify-center hover:scale-105 px-1 border border-black rounded-md"
                        onClick={() => handleAddOneNode(props)}>
                        +1
                    </div>
                    <div className="flex items-center justify-center hover:scale-105 transition-all ease-in-out px-1 border border-black rounded-md"
                        onClick={() => handleAddTwoNode(props)}>
                        +2
                    </div>
                    {
                        nodes.length !== 1 && <div className="flex items-center justify-center hover:scale-105 px-1 border border-black rounded-md"
                            onClick={() => handleDeleteNode([props])}>
                            <img src="/assets/icons/delete.svg" alt="" height={20} width={20} />
                        </div>
                    }
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} id={Position.Bottom} />
            <Handle
                type="source"
                position={Position.Right}
                id={Position.Right}
            />
            <Handle
                type="source"
                position={Position.Left}
                id={Position.Left}
            />
        </div>
    );
};

export default TextNode;
