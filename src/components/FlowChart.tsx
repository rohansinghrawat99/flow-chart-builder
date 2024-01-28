import React, { useCallback } from "react";
import ReactFlow, { Position, addEdge, getConnectedEdges, getIncomers, getOutgoers, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "../shared-components/TextNode";
import { FlowChartContext } from "../utils/contexts/FlowChartContext";

const nodeTypes: any = { textUpdater: TextNode }

const initialNodes: any = [
    { id: "0", type: 'textUpdater', position: { x: 0, y: 0 }, data: { label: 'New Node' } },
];
const initialEdges: any[] = [];

interface FlowChartProps {
    height: string,
    widht: string
}

const FlowChart: React.FC<FlowChartProps> = ({
    height,
    widht
}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds: any) => addEdge(params, eds)),
        [setEdges],
    );

    const handleAddOneNode = (selectedNode: any) => {
        const lastNode = nodes[nodes.length - 1]
        const newPosition = {
            x: selectedNode.xPos,
            y: selectedNode.yPos + 200,
        }
        const newId = (+lastNode.id + 1).toString();
        const newNode = { id: newId, type: 'textUpdater', position: newPosition, data: { label: 'New Node' } }
        setNodes((nodes: any[]) => nodes.concat(newNode));
        setEdges((edges: any[]) =>
            edges.concat({ id: newId, source: selectedNode.id, target: newId }),
        )
    }

    const handleAddTwoNode = (selectedNode: any) => {
        const lastNode = nodes[nodes.length - 1]
        const newPositionLeft = {
            x: selectedNode.xPos - 300,
            y: selectedNode.yPos + 100,
        }
        const newPositionRight = {
            x: selectedNode.xPos + 300,
            y: selectedNode.yPos + 100,
        }
        const newIdLeft = +lastNode.id + 1;
        const newIdRight = +lastNode.id + 2;
        const newNodeLeft = { id: newIdLeft.toString(), type: 'textUpdater', position: newPositionLeft, data: { label: 'New Node' } }
        const newNodeRight = { id: newIdRight.toString(), type: 'textUpdater', position: newPositionRight, data: { label: 'New Node' } }
        setNodes((nodes: any[]) => (nodes.concat(newNodeLeft)).concat(newNodeRight));
        const newEdgeLeft = { id: newIdLeft.toString(), source: selectedNode.id, target: newIdLeft.toString(), sourceHandle: Position.Left }
        const newEdgeRight = { id: newIdRight.toString(), source: selectedNode.id, target: newIdRight.toString(), sourceHandle: Position.Right }
        setEdges((edges: any[]) =>
            (edges.concat(newEdgeLeft).concat(newEdgeRight)),
        )
    }

    const handleDeleteNode = useCallback(
        (deleted: any[]) => {
            setEdges(
                deleted.reduce((acc: any[], node: any) => {
                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter((edge: any) => !connectedEdges.includes(edge));

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges)
            );
            setNodes((nodes: any[]) => nodes.filter((e: { id: any; }) => e.id !== deleted[0].id))
        },
        [nodes, edges]
    )

    return (
        <FlowChartContext.Provider value={{
            nodes: nodes,
            edges: edges,
            handleAddOneNode: handleAddOneNode,
            handleAddTwoNode: handleAddTwoNode,
            handleDeleteNode: handleDeleteNode
        }}
        >
            <div className={
                `${height} ${widht} flex justify-center items-center`
            }>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodesDelete={handleDeleteNode}
                />
            </div>
        </FlowChartContext.Provider>
    );
};

export default FlowChart;
