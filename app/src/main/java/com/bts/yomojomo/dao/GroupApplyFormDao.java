package com.bts.yomojomo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.bts.yomojomo.domain.GroupApplyForm;

@Mapper
public interface GroupApplyFormDao {

  List<GroupApplyForm> sendListFindALL(GroupApplyForm groupApplyForm);
}
