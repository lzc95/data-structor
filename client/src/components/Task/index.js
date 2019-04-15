import React from 'react'
import {List,Card} from 'antd'

class Task extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
          ];
        return(<div>
            <Card
                type="inner"
                title="Inner Card title"
                >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                    )}
                />
            </Card>
        </div>)
    }
  
}

export default Task