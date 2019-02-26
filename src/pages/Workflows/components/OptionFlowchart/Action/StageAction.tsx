import * as React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Setting } from '../index'
import InputSelect from '../../../../../components/InputSelect'
import { OptionModel } from '../../../models';
import { StageModel } from '../../../../Stages/models';

interface Props {
  item: OptionModel;
  stages: Array<StageModel>;
  isForm?: boolean;
  onUpdate: (_id: string, value: string) => void;
  onDestroy: (_id: string) => void;
}

class StageAction extends React.Component<Props> {
  render() {
    const { item, isForm, onUpdate, onDestroy, stages } = this.props;
    const stage = stages.filter(stage=>stage._id === item.value)[0];

    return (
      <>
        {isForm &&
          <Setting
            data={item}
            onUpdate={onUpdate}
            onDelete={onDestroy}
            updateForm={
              <InputSelect value={item.value} options={stages} valueLabel="name" onSave={(value: string)=> onUpdate(item._id, value)} />
            }
          />
        }
        <Typography variant="subtitle2" color="primary" align="center">Send the candidate to stage</Typography>
        <Typography variant="subtitle1" color="primary" align="center">{`
          ${stage && stage.name || "..."}
        `}</Typography>
      </>
    );
  }
}

function mapStateToProps(state: any) {
  const { selectedPipeline: {stages} } = state.pipelineReducer

  return {
    stages
  };
};

export default connect(mapStateToProps)(StageAction);
